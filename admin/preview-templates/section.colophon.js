import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

// Preview component for a index sections
const SectionColophon = createClass({
  render() {
    const entry = this.props.entry;

    const title = entry.getIn(['data', 'title'], null);
    const content = this.props.widgetFor('content');
    const images = this.props.widgetsFor('images');

    return html`
      <main>
        <section id="colophon" class="section">
          <h2 class="section__heading">${title}</h2>
          ${content}
          <ul class="image-grid">
            ${images.map(function(image, index) {
              const src = image.getIn(['widgets', 'src']);
              return html`
                <li class="image-grid__item">${src}</li>
              `;
            })}
          </ul>
        </section>
      </main>
    `;
  }
});

export default SectionColophon;
