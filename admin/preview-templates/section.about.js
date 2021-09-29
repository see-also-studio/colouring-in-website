import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

// Preview component for a index sections
const SectionAbout = createClass({
  render() {
    const entry = this.props.entry;

    const title = entry.getIn(['data', 'title'], null);
    const content = this.props.widgetFor('content');

    return html`
      <main>
        <section id="about" class="section">
          <h2 class="section__heading">${title}</h2>
          ${content}
        </section>
      </main>
    `;
  }
});

export default SectionAbout;
