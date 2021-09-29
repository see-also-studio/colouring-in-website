import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

// Preview component for a index sections
const Bar = createClass({
  render() {
    const entry = this.props.entry;

    const content = entry.getIn(['data', 'content'], null);

    return html`
      <main>
      </main>
      <div id="bar" class="bar">
        <span>${content}</span>
        <span class="clone">${content}</span>
        <span class="clone">${content}</span>
        <span class="clone">${content}</span>
        <span class="clone">${content}</span>
        <span class="clone">${content}</span>
      </div>
    `;
  }
});

export default Bar;
