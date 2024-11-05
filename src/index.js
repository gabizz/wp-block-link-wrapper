const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;

registerBlockType('gblw/link-wrapper', {
    title: 'Link Wrapper',
    icon: 'admin-links',
    category: 'gabriel-maftei',
    
    // Add block supports
    supports: {
        html: false,
        anchor: true,
        align: ['wide', 'full'],
        spacing: {
            margin: true,
            padding: true
        },
        reusable: true,
    },

    attributes: {
        linkURL: { type: 'string', default: '' },
        linkNewTab: { type: 'boolean', default: false },
    },

    edit: (props) => {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps({
            className: 'link-wrapper-block'
        });

        // Allow any block to be inserted
        const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map(block => block.name);

        return (
            <Fragment>
                <div {...blockProps}>
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        renderAppender={InnerBlocks.ButtonBlockAppender}
                        orientation="vertical"
                        templateLock={false}
                    />
                </div>
                <InspectorControls>
                    <PanelBody title="Link Wrapper Settings" initialOpen={true}>
                        <TextControl
                            label="Link URL"
                            value={attributes.linkURL}
                            onChange={(newURL) => setAttributes({ linkURL: newURL })}
                            placeholder="https://example.com"
                        />
                        <ToggleControl
                            label="Open in New Tab"
                            checked={attributes.linkNewTab}
                            onChange={(newTab) => setAttributes({ linkNewTab: newTab })}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    },

    save: (props) => {
        const { attributes } = props;
        const { linkURL, linkNewTab } = attributes;
        const blockProps = useBlockProps.save({
            className: 'link-wrapper-block'
        });

        return linkURL ? (
            <a
                href={linkURL}
                target={linkNewTab ? '_blank' : '_self'}
                rel={linkNewTab ? 'noopener noreferrer' : ''}
                {...blockProps}
            >
                <InnerBlocks.Content />
            </a>
        ) : (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});