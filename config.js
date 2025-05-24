CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    // Add the customShortcuts plugin
    // If extraPlugins is already set, append to it. Otherwise, create it.
    config.extraPlugins = (config.extraPlugins ? config.extraPlugins + ',' : '') + 'customShortcuts';

    // It's also important to tell CKEditor where to find the plugin,
    // if it's not in the default 'plugins' folder.
    // Assuming 'customShortcuts' directory is at the same level as 'plugins' directory
    // or at the root of the website where ckeditor.js is located.
    // If 'customShortcuts' is in the root of your project (like in this repo),
    // and your CKEditor 'plugins' folder is elsewhere, you might need this:
    // CKEDITOR.plugins.addExternal('customShortcuts', '/path/to/customShortcuts/', 'plugin.js');
    // For this example, we assume 'customShortcuts' is alongside 'plugins' or CKEditor can find it.
    // If 'customShortcuts' is in the repo root (as it is here), and CKEditor is also in the root,
    // or if the 'plugins' folder is in the root, this might be:
    // CKEDITOR.plugins.addExternal('customShortcuts', 'customShortcuts/', 'plugin.js');
    // However, often CKEditor is in its own directory like 'ckeditor/', 
    // and 'config.js' is inside it. If 'customShortcuts' is outside that, like in the project root,
    // the path would be relative from ckeditor.js to the customShortcuts folder.
    // For example, if ckeditor.js is in 'assets/ckeditor/' and customShortcuts is in 'plugins/customShortcuts' (project root based)
    // then path might be '../../plugins/customShortcuts/'.

    // For the current repository structure, if ckeditor.js is in the root,
    // and customShortcuts folder is also in the root, this tells CKEditor where to find it:
    CKEDITOR.plugins.addExternal('customShortcuts', 'customShortcuts/', 'plugin.js');
};
