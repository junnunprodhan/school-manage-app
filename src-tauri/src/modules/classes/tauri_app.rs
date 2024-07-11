use super::super::school_classes;
use super::schemas::Class;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_class(state: State<'_, TauriApp>, name: &str) -> Result<Id> {
    let admin = state.admin.lock().await;
    let class_id = super::services::create_class(admin.connection(), name).await?;

    Ok(class_id)
}

#[tauri::command]
pub async fn get_class(state: State<'_, TauriApp>, class_id: Id) -> Result<Class> {
    let admin = state.admin.lock().await;
    let class = super::services::get_class(admin.connection(), class_id).await?;

    Ok(class)
}

#[tauri::command]
pub async fn get_classes(state: State<'_, TauriApp>) -> Result<Vec<Class>> {
    let admin = state.admin.lock().await;
    let classes = super::services::get_classes(admin.connection()).await?;

    Ok(classes)
}

#[tauri::command]
pub async fn add_class(state: State<'_, TauriApp>, name: &str) -> Result<Id> {
    let admin = state.admin.lock().await;
    let class_id = super::services::create_class(admin.connection(), name).await?;

    school_classes::services::add_class_to_school(admin.connection(), class_id, admin.school_id())
        .await?;

    Ok(class_id)
}
