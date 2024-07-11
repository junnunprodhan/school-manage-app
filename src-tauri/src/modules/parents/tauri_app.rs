use super::super::student_parents;
use super::schemas::Parent;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_parent(
    state: State<'_, TauriApp>,
    name: &str,
    img: &str,
    profession: &str,
    about_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let parent_id =
        super::services::create_parent(admin.connection(), name, img, profession, about_id).await?;

    Ok(parent_id)
}

#[tauri::command]
pub async fn get_parent(state: State<'_, TauriApp>, parent_id: Id) -> Result<Parent> {
    let admin = state.admin.lock().await;
    let parent = super::services::get_parent(admin.connection(), parent_id).await?;

    Ok(parent)
}

#[tauri::command]
pub async fn get_parents(state: State<'_, TauriApp>) -> Result<Vec<Parent>> {
    let admin = state.admin.lock().await;
    let parents = super::services::get_parents(admin.connection()).await?;

    Ok(parents)
}

#[tauri::command]
pub async fn add_parent(
    state: State<'_, TauriApp>,
    //
    name: &str,
    img: &str,
    profession: &str,
    // about
    birth: &str,
    gender: &str,
    address: &str,
    number: &str,
    // login
    email: &str,
    password: &str,
    //  student
    student_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let about_id = super::super::abouts::services::create_about(
        admin.connection(),
        birth,
        gender,
        address,
        number,
        email,
        password,
    )
    .await?;
    let parent_id =
        super::services::create_parent(admin.connection(), name, img, profession, about_id).await?;

    student_parents::services::add_parent_to_student(admin.connection(), parent_id, student_id)
        .await?;

    Ok(parent_id)
}
