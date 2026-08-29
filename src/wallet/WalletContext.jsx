import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ETH } from '../tools/contract.js';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(ETH.account || '');
  const [status, setStatus] = useState(ETH.signer && ETH.account ? 'connected' : 'idle');
  const [error, setError] = useState(null);
  const connectPromiseRef = useRef(null);

  const applyAddress = useCallback((nextAddress = '') => {
    const normalizedAddress = nextAddress || '';
    ETH.account = normalizedAddress;
    setAddress(normalizedAddress);
    setStatus(normalizedAddress && ETH.signer ? 'connected' : 'disconnected');

    if (normalizedAddress) localStorage.setItem('account', normalizedAddress);
    else localStorage.removeItem('account');
  }, []);

  const connect = useCallback(async () => {
    if (ETH.signer && ETH.account) {
      applyAddress(ETH.account);
      return ETH.account;
    }

    if (connectPromiseRef.current) return connectPromiseRef.current;

    setStatus('connecting');
    setError(null);

    const pendingConnection = ETH.getAccount()
      .then((connectedAddress) => {
        applyAddress(connectedAddress);
        return connectedAddress;
      })
      .catch((connectionError) => {
        setError(connectionError);
        setStatus('error');
        throw connectionError;
      })
      .finally(() => {
        connectPromiseRef.current = null;
      });

    connectPromiseRef.current = pendingConnection;
    return pendingConnection;
  }, [applyAddress]);

  useEffect(() => {
    const ethereum = window.ethereum;

    const handleAccountsChanged = (accounts = []) => {
      const nextAddress = accounts[0] || '';
      if (!nextAddress) {
        ETH.provider = undefined;
        ETH.signer = undefined;
      } else if (ETH.provider) {
        ETH.signer = ETH.provider.getSigner();
      }
      setError(null);
      applyAddress(nextAddress);
    };

    const handleChainChanged = () => {
      ETH.provider = undefined;
      ETH.signer = undefined;
      ETH.account = '';
      setAddress('');
      setError(null);
      setStatus('idle');
    };

    const handleWalletConnected = (event) => {
      const nextAddress = event.detail?.address || ETH.account || '';
      if (nextAddress) applyAddress(nextAddress);
    };

    ethereum?.on?.('accountsChanged', handleAccountsChanged);
    ethereum?.on?.('chainChanged', handleChainChanged);
    window.addEventListener('mobius:wallet-connected', handleWalletConnected);

    return () => {
      ethereum?.removeListener?.('accountsChanged', handleAccountsChanged);
      ethereum?.removeListener?.('chainChanged', handleChainChanged);
      window.removeEventListener('mobius:wallet-connected', handleWalletConnected);
    };
  }, [applyAddress]);

  const value = useMemo(() => ({
    address,
    status,
    error,
    connect,
    hasSavedAccount: Boolean(localStorage.getItem('account')),
  }), [address, status, error, connect]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used inside WalletProvider');
  return context;
}
