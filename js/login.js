//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/*
function ingreso(){
    if(document.getElementsByName("usuario").value !== "" && 
    document.getElementsByName("pass").value !=="" ){
    window.location.href = "home.html"}
    else{
        alert("Debe llenar los campos");
    }
}*/

import (
    "context"
    "fmt"
    "os"

    "cloud.google.com/go/pubsub"
    "golang.org/x/oauth2"
    "golang.org/x/oauth2/google"
    "google.golang.org/api/option"
)

// oauthClient shows how to use an OAuth client ID to authenticate as an end-user.
func oauthClient() error {
    ctx := context.Background()

    // Please make sure the redirect URL is the same as the one you specified when you
    // created the client ID.
    redirectURL := os.Getenv("OAUTH2_CALLBACK")
    if redirectURL == "" {
            redirectURL = "your redirect url"
    }
    config := &oauth2.Config{
            ClientID:     "717573377859-rn635mvg0qt7b33u4drritmhs7v33slf.apps.googleusercontent.com",
            ClientSecret: "gKR7KnTpMCcsFcBIBCsahA7b",
            RedirectURL:  redirectURL,
            Scopes:       []string{"email", "profile"},
            Endpoint:     google.Endpoint,
    }

    // Dummy authorization flow to read auth code from stdin.
    authURL := config.AuthCodeURL("your state")
    fmt.Printf("Follow the link in your browser to obtain auth code: %s", authURL)

    // Read the authentication code from the command line
    var code string
    fmt.Scanln(&code)

    // Exchange auth code for OAuth token.
    token, err := config.Exchange(ctx, code)
    if err != nil {
            return fmt.Errorf("config.Exchange: %v", err)
    }
    client, err := pubsub.NewClient(ctx, "your-project-id", option.WithTokenSource(config.TokenSource(ctx, token)))
    if err != nil {
            return fmt.Errorf("pubsub.NewClient: %v", err)
    }
    defer client.Close()

    // Use the authenticated client.
    _ = client

    return nil
}