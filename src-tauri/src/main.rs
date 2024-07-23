#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
  )]
  
  use tauri::{AppHandle, CustomMenuItem, Menu, MenuItem, Submenu, WindowBuilder, WindowUrl};
  
  fn create_app_menu() -> Menu {
    let recent_menu = Menu::new()
      .add_item(CustomMenuItem::new("recent1".to_string(), "Recent 1"))
      .add_item(CustomMenuItem::new("recent2".to_string(), "Recent 2"));
  
    Menu::new()
      .add_submenu(Submenu::new("App", Menu::new().add_native_item(MenuItem::Quit)))
      .add_submenu(Submenu::new(
        "File",
        Menu::new().add_submenu(Submenu::new("Open Recent", recent_menu)),
      ))
  }
  
  #[tauri::command]
  fn create_secondary_window(app: AppHandle) {
    WindowBuilder::new(&app, "secondary", WindowUrl::App("http://localhost:3000/secondary".into()))
      .title("Secondary Window")
      .build()
      .expect("Failed to create secondary window");
  }
  
  fn main() {
    tauri::Builder::default()
      .menu(create_app_menu())
      .invoke_handler(tauri::generate_handler![create_secondary_window])
      .on_menu_event(|event| {
        let window = event.window();
        match event.menu_item_id() {
          "recent1" => {
            let item = "Recent 1".to_string();
            window.emit("item-clicked", item).expect("Something Went Wrong!");
          }
          "recent2" => {
            let item = "Recent 2".to_string();
            window.emit("item-clicked", item).expect("Something Went Wrong!");
          }
          _ => {}
        }
      })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
  }
  