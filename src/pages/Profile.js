import React from "react";
import { Link } from "react-router-dom";




function Profile() {





  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> (uit de context) hardcoded-test</p>
        <p><strong>Email:</strong>(uit de context) hardcoded@test.com</p>
      </section>
      <section>
        <h2>Strikt geheime profiel-content (uit de backend, via useEffect, async, etc)</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;