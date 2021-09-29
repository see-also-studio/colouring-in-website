import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

// Preview component for a index sections
const SectionContact = createClass({
  render() {
    const entry = this.props.entry;

    const title = entry.getIn(['data', 'title'], null);
    const label = entry.getIn(['data', 'label'], null);
    const isEnabled = entry.getIn(['data', 'enabled'], null);
    const placeholder = entry.getIn(['data', 'placeholder'], null);
    const submitButton = entry.getIn(['data', 'submitButton'], null);
    const emailButton = entry.getIn(['data', 'emailButton'], null);
    const newsletterLabel = entry.getIn(['data', 'newsletterLabel'], null);
    const newsletterPlaceholder = entry.getIn(['data', 'newsletterPlaceholder'], null);
    const newsletterButton = entry.getIn(['data', 'newsletterButton'], null);
    const newsletterAction = entry.getIn(['data', 'newsletterAction'], null);

    return html`
      <main>
        <section id="contact" class="section">
          <h2 class="section__heading">${title}</h2>
          <p>${label}</p>
          ${(function() {
            if (isEnabled) {
              return html`
                <input placeholder="${placeholder}" type="text"/>
                <a class="button--round">${submitButton}</a>
              `;
            }
          })()}
          <a class="button--round">${emailButton}</a>
          ${(function() {
            if (newsletterAction.length) {
              return html`
                <p>${newsletterLabel}</p>
                <input placeholder="${newsletterPlaceholder}" type="text"/>
                <a class="button--round">${newsletterButton}</a>
              `;
            }
          })()}
        </section>
      </main>
    `;
  }
});

export default SectionContact;
