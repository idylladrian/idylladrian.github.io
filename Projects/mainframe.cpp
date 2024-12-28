#include <ft2build.h>
#include FT_FREETYPE_H
#include <gtkmm.h> // Include GTKmm header file
#include <iostream>
#include <vector>

// Define a custom application class
class ControlApplet : public Gtk::Window {
public:
    ControlApplet() {
        set_title("261 Main St Mainframe");  // Set the window title

        /*fullscreen();*/
        auto display = get_screen();
        Gdk::Rectangle workarea;
        display->get_monitor_workarea(display->get_primary_monitor());
        set_default_size(workarea.get_width(), workarea.get_height());       // Set window size

        // Apply CSS to set background color
        auto cssProvider = Gtk::CssProvider::create();
        cssProvider->load_from_data(R"(
            window { 
                background-color: black;
            }
            label {
                font-family: 'Data Control';
            }
            button {
                font-family: 'Data Control';
            }
        )"); // CSS rule

        auto styleContext = get_style_context();
        styleContext->add_provider(cssProvider, GTK_STYLE_PROVIDER_PRIORITY_USER);

        // Add the VBox layout to the window
        vbox.set_orientation(Gtk::ORIENTATION_VERTICAL);
        add(vbox);
        vbox.set_spacing(10);

        // Add widgets to the VBox
        /*addLabel("Label 1");
        addLabel("Label 2");
        addButton("Click Me!");*/

        // Create labels and buttons
        auto label1 = Gtk::manage(new Gtk::Label("Label 1"));
        auto label2 = Gtk::manage(new Gtk::Label("Label 2"));
        auto button = Gtk::manage(new Gtk::Button("Click Me!"));

        vbox.pack_start(*label1, Gtk::PACK_SHRINK);
        vbox.pack_start(*label2, Gtk::PACK_SHRINK);
        vbox.pack_start(*button, Gtk::PACK_SHRINK);

        // Apply CSS to the widgets
        styleContext = label1->get_style_context();
        styleContext->add_provider(cssProvider, GTK_STYLE_PROVIDER_PRIORITY_USER);

        styleContext = label2->get_style_context();
        styleContext->add_provider(cssProvider, GTK_STYLE_PROVIDER_PRIORITY_USER);

        styleContext = button->get_style_context();
        styleContext->add_provider(cssProvider, GTK_STYLE_PROVIDER_PRIORITY_USER);

        /*show();*/

        // Show all components
        show_all_children();
    }

    // Function to add labels
    void addLabel(const Glib::ustring& text) {
        auto label = Gtk::make_managed<Gtk::Label>(text); // Create label
        vbox.pack_start(*label); // Add label to the VBox
    }

    // Function to add buttons
    void addButton(const Glib::ustring& label) {
        auto button = Gtk::make_managed<Gtk::Button>(label); // Create button
        button->signal_clicked().connect([label]() { // Connect signal
            std::cout << label << " button clicked!" << std::endl;
            });
        vbox.pack_start(*button); // Add button to the VBox
    }

protected:
    // Menu item handlers
    void on_new_clicked() {
        std::cout << "New File Selected!" << std::endl;
    }

    void on_open_clicked() {
        std::cout << "Open File Selected!" << std::endl;
    }

    void on_exit_clicked() {
        close(); // Close the window
    }

private:
    Gtk::Box vbox; // VBox with spacing (10 pixels)
};

// Main function
int main(int argc, char* argv[]) {
    auto app = Gtk::Application::create(argc, argv, "com.example.basicapplet"); // Initialize GTKmm application
    ControlApplet window; // Create the window
    return app->run(window); // Run the application
}
