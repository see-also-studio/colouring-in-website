import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

// Preview component for a index sections
const SectionAuthors = createClass({
  render() {
    const entry = this.props.entry;

    const title = entry.getIn(['data', 'title'], null);
    const authors = this.props.widgetsFor('authors');

    return html`
      <main>
        <section id="authors" class="section">
          <h2 class="section__heading">${title}</h2>
          ${authors.map(function(author, index) {
            const contentLess = author.getIn(['widgets', 'content']);
            const contentMore = author.getIn(['widgets', 'contentMore']);

            return html`
              <div class="author more-less para-spacing more-less--active">
                <div class="more-less__less preview">${contentLess}</div>
                <div class="more-less__more more">
                  <div class="more__inner">${contentMore}</div>
                </div>
              </div>
            `;
          })}
        </section>
      </main>
    `;
  }
});

export default SectionAuthors;
