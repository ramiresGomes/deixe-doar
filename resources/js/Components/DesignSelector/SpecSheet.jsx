export default function SpecSheet({ id, concept, fonts, palette, buttons, texture }) {
    return (
        <section className="ds-spec" aria-labelledby={`${id}-spec`}>
            <div className="ds-spec__intro">
                <h2 id={`${id}-spec`} className="ds-spec__title">
                    Sistema visual
                </h2>
                <p className="ds-spec__concept">{concept}</p>
            </div>

            <div className="ds-spec__grid">
                <div className="ds-spec__block ds-spec__block--type">
                    <h3 className="ds-spec__heading">Tipografia</h3>
                    {fonts.map((font) => (
                        <div key={font.family} className="ds-spec__font">
                            <p className="ds-spec__font-name">
                                {font.family}
                                <span>{font.role}</span>
                            </p>
                            <p className={font.sampleClassName}>{font.sample}</p>
                        </div>
                    ))}
                </div>

                <div className="ds-spec__block">
                    <h3 className="ds-spec__heading">Paleta</h3>
                    <ul className="ds-spec__palette">
                        {palette.map((swatch) => (
                            <li key={swatch.hex} className="ds-spec__swatch">
                                <span className="ds-spec__chip" style={{ background: swatch.hex }} aria-hidden="true" />
                                <span className="ds-spec__swatch-name">{swatch.name}</span>
                                <span className="ds-spec__swatch-hex">{swatch.hex}</span>
                                <span className="ds-spec__swatch-use">{swatch.use}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ds-spec__block">
                    <h3 className="ds-spec__heading">Botões</h3>
                    <div className="ds-spec__buttons">{buttons}</div>
                </div>

                <div className="ds-spec__block">
                    <h3 className="ds-spec__heading">Textura e composição</h3>
                    <div className={`ds-spec__texture ${texture.className}`} aria-hidden="true" />
                    <p className="ds-spec__texture-text">{texture.text}</p>
                </div>
            </div>
        </section>
    );
}
