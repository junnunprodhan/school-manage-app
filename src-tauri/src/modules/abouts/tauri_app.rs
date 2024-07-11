use super::schemas::About;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_about(state: State<'_, TauriApp>,  birth: &str, gender: &str, address: &str, number: &str, email: &str, password: &str) -> Result<Id> {
    let admin = state.admin.lock().await;
    let about_id = super::services::create_about(admin.connection(), birth, gender, address, number, email, password).await?;

    Ok(about_id)
}

#[tauri::command]
pub async fn get_about(state: State<'_, TauriApp>, about_id: Id) -> Result<About> {
    let admin = state.admin.lock().await;
    let about = super::services::get_about(admin.connection(), about_id).await?;

    Ok(about)
}