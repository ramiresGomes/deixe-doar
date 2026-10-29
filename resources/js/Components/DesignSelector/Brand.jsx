import { Camera } from 'lucide-react';
import { LOGO_SRC } from './shared';

/**
 * The logo's centre is transparent, so the indigo lettering disappears on dark surfaces.
 * `onDark` fills the centre with a white disc that sits under the ring.
 */
export function Logo({ size = 56, onDark = false, className = '' }) {
    return (
        <img
            src={LOGO_SRC}
            alt="Deixe Doar"
            width={size}
            height={size}
            className={`ds-logo ${onDark ? 'ds-logo--on-dark' : ''} ${className}`}
        />
    );
}

export function SiteFooter({ variant, site }) {
    const { institution, contact } = site;

    return (
        <footer className={`ds-footer ds-footer--${variant}`}>
            <div className="ds-footer__inner">
                <div className="ds-footer__brand">
                    <Logo size={72} onDark />
                    <p>
                        Uma campanha do {institution.name}, em {institution.headquarters}, desde{' '}
                        {institution.founded_year}.
                    </p>
                </div>
                <dl className="ds-footer__facts">
                    <div>
                        <dt>{institution.name}</dt>
                        <dd>CNPJ {institution.cnpj}</dd>
                    </div>
                    <div>
                        <dt>{institution.partner_name}</dt>
                        <dd>CNPJ {institution.partner_cnpj}</dd>
                    </div>
                    <div>
                        <dt>Atendimento</dt>
                        <dd>
                            <a href={contact.whatsapp_url}>WhatsApp {contact.whatsapp_display}</a>
                            <br />
                            <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </dd>
                    </div>
                </dl>
            </div>
        </footer>
    );
}

export function PhotoSlot({ label, className = '' }) {
    return (
        <div className={`ds-photo ${className}`} role="img" aria-label={`Espaço para foto: ${label}`}>
            <Camera aria-hidden="true" strokeWidth={1.5} />
            <span>Foto: {label}</span>
        </div>
    );
}
