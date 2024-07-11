use super::super::classes::schemas::Class;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn add_class_to_school(state: State<'_, TauriApp>, class_id: Id) -> Result<Id> {
    let admin = state.admin.lock().await;
    let id = super::services::add_class_to_school(admin.connection(), class_id, admin.school_id())
        .await?;

    Ok(id)
}

#[tauri::command]
pub async fn get_school_classes(state: State<'_, TauriApp>) -> Result<Vec<Class>> {
    let admin = state.admin.lock().await;
    let classes =
        super::services::get_school_classes(admin.connection(), admin.school_id()).await?;

    Ok(classes)
}

#[tauri::command]
pub async fn get_school_classes_count(state: State<'_, TauriApp>) -> Result<usize> {
    let admin = state.admin.lock().await;
    let classes =
        super::services::get_school_classes(admin.connection(), admin.school_id()).await?;

    Ok(classes.len())
}

