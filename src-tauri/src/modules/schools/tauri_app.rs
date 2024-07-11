use super::schemas::School;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn get_school(state: State<'_, TauriApp>, school_id: Id) -> Result<School> {
    let admin = state.admin.lock().await;
    let school = super::services::get_school(admin.connection(), school_id).await?;

    Ok(school)
}

#[tauri::command]
pub async fn get_schools(state: State<'_, TauriApp>) -> Result<Vec<School>> {
    let admin = state.admin.lock().await;
    let schools = super::services::get_schools(admin.connection()).await?;

    Ok(schools)
}
