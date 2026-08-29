import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../wallet/WalletContext.jsx';

export default function BusinessWalletGate({ children }) {
  const requestedRef = useRef(false);
  const { t } = useTranslation();
  const { address, status, error, connect } = useWallet();

  useEffect(() => {
    if (status !== 'idle' || requestedRef.current) return;
    requestedRef.current = true;
    connect().catch(() => undefined);
  }, [status, connect]);

  if (status === 'connected' && address) {
    return <React.Fragment key={address}>{children}</React.Fragment>;
  }

  return (
    <section className="business-wallet-gate" aria-live="polite">
      <div className="business-wallet-gate-card">
        <span className="business-wallet-gate-mark" aria-hidden="true">MS</span>
        <h1>{t('Connecting wallet')}</h1>
        {status === 'connecting' ? (
          <p>{t('Contract verification in progress')}</p>
        ) : (
          <>
            <p>{error?.message || t('Please connect to the BSC network')}</p>
            <button
              type="button"
              className="button button-primary"
              onClick={() => connect().catch(() => undefined)}
            >
              {t('JOIN')}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
