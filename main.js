/*
 * Copyright (c) 2014 Joan Leon <joan.leon@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true,  regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window */

define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var CommandManager      = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        ExtensionUtils      = brackets.getModule("utils/ExtensionUtils"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        Menus               = brackets.getModule("command/Menus"),
        NativeApp           = brackets.getModule("utils/NativeApp"),
        PanelManager        = brackets.getModule("view/PanelManager");
    
    
    // Constants
    var NAVIGATE_LOOKUP_IN_MDN  = "Lookup in MDN",
        CMD_LOOKUP_IN_MDNDOC    = "nucliweb.lookupInMdnDoc";
    
    // jQuery objects
    var $icon;
    
    // Other vars
    var query,
        language = "en-US";
        
    function _loadDocumentation() {
        
        var url = "http://developer.mozilla.org/"+language+"/search";
        var editor = EditorManager.getActiveEditor();
        
        if (!editor) {
            return;
        }

        query = editor.getSelectedText();
        
        if (query) {
            url += "?q=" + query;
        }

        NativeApp.openURLInDefaultBrowser(url);
        
    }

   
    // Insert CSS for this extension
    ExtensionUtils.loadStyleSheet(module, "MdnSearchDoc.css");
    
    // Add toolbar icon 
    $icon = $("<a>")
        .attr({
            id: "mdnsearchdoc-viewer-icon",
            href: "#",
            title: "MDN Search Doc"
        })
        .click(_loadDocumentation)
        .appendTo($("#main-toolbar .buttons"));
    
    
    // Add "Lookup in MDN Doc" command
    function _handleLookupInMdnDoc() {
        _loadDocumentation();
    }
    
    
    // Register the command and shortcut
    CommandManager.register(
        NAVIGATE_LOOKUP_IN_MDN,
        CMD_LOOKUP_IN_MDNDOC,
        _handleLookupInMdnDoc
    );
    KeyBindingManager.addBinding(CMD_LOOKUP_IN_MDNDOC, "Shift-Ctrl-M");
    
    // Create a menu item bound to the command
    var menu = Menus.getMenu(Menus.AppMenuBar.NAVIGATE_MENU);
    menu.addMenuItem(CMD_LOOKUP_IN_MDNDOC);
});
