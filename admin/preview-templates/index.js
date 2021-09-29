import SectionAbout from '/admin/preview-templates/section.about.js';
import SectionAuthors from '/admin/preview-templates/section.authors.js';
import SectionReferences from '/admin/preview-templates/section.references.js';
import SectionContact from '/admin/preview-templates/section.contact.js';
import SectionColophon from '/admin/preview-templates/section.colophon.js';
import Bar from '/admin/preview-templates/bar.js';

// Register the Post component as the preview for entries in the blog collection
CMS.registerPreviewTemplate('about', SectionAbout);
CMS.registerPreviewTemplate('authors', SectionAuthors);
CMS.registerPreviewTemplate('references', SectionReferences);
CMS.registerPreviewTemplate('contact', SectionContact);
CMS.registerPreviewTemplate('colophon', SectionColophon);
CMS.registerPreviewTemplate('bar', Bar);

CMS.registerPreviewStyle('/assets/styles/admin.css');
