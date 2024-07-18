
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn create_app_menu() -> Menu {
  let recent_menu = Menu:: new()
  .add_item(CustomMenuItem::new("recent1".to_string(), "Recent 1"))
  .add_item(CustomMenuItem::new("recent2".to_string(), "Recent 2"));

  return Menu::new()
      .add_submenu(Submenu::new(
          "App",
          Menu::new().add_native_item(MenuItem::Quit),
      ))
      .add_submenu(Submenu::new(
          "File",
          Menu::new().add_submenu(Submenu::new(
              "Open Recent",
              recent_menu,
          ))
      ));
}

fn main() {
  tauri::Builder::default()
      .menu(create_app_menu())
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
