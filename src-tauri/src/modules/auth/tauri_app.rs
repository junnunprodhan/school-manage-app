use super::schemas::{AuthUserReply, AuthReply};
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;


#[tauri::command]
pub async fn signup(
    state: State<'_, TauriApp>,
    //
    name: &str,
    img: &str,
    // about
    birth: &str,
    gender: &str,
    address: &str,
    number: &str,
    // login
    email: &str,
    password: &str,
) -> Result<AuthReply> {
    let mut admin = state.admin.lock().await;

    let auth_reply = super::services::signup(
        admin.connection(),
        name,
        img,
        birth,
        gender,
        address,
        number,
        email,
        password,
    )
    .await?;

    admin.login(auth_reply.school_id);

    Ok(auth_reply)
}

#[tauri::command]
pub async fn login(
    state: State<'_, TauriApp>,
    user_type: &str,
    school_id: Option<Id>,
    email: &str,
    password: &str,
) -> Result<AuthReply> {
    let mut admin = state.admin.lock().await;

    let auth_reply =
        super::services::login(admin.connection(), user_type, school_id, email, password).await?;

    admin.login(auth_reply.school_id);

    Ok(auth_reply)
}


#[tauri::command]
pub async fn logout(
    state: State<'_, TauriApp>
) -> Result<()> {
    let mut admin = state.admin.lock().await;

    admin.logout();

    Ok(())
}
#[tauri::command]
pub async fn auth_user(
    state: State<'_, TauriApp>,
    token: &str,
) -> Result<AuthUserReply> {
    let mut admin = state.admin.lock().await;

    let auth_user_reply =
        super::services::auth_user(admin.connection(), token).await?;

    admin.login(auth_user_reply.school_id);

    Ok(auth_user_reply)
}