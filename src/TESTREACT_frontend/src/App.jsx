import { useState } from 'react';
import { createActor, TESTREACT_backend } from '../../declarations/TESTREACT_backend';
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";

let actor = TESTREACT_backend;

//conexion a INTERNET IDENTITY
const greetButton = document.getElementById("greet");
greetButton.onclick = async (e) => {
    e.preventDefault();

    greetButton.setAttribute("disabled", true);

    // Interact with backend actor, calling the greet method
    const greeting = await actor.greet();

    greetButton.removeAttribute("disabled");

    document.getElementById("greeting").innerText = greeting;

    return false;
};

const loginButton = document.getElementById("login");
loginButton.onclick = async (e) => {
    e.preventDefault();

    // create an auth client
    let authClient = await AuthClient.create();

    // start the login process and wait for it to finish
    await new Promise((resolve) => {
        authClient.login({
            identityProvider: process.env.II_URL,
            onSuccess: resolve,
        });
    });

    // At this point we're authenticated, and we can get the identity from the auth client:
    const identity = authClient.getIdentity();
    // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
    const agent = new HttpAgent({identity});
    // Using the interface description of our webapp, we create an actor that we use to call the service methods.
    actor = createActor(process.env.GREET_BACKEND_CANISTER_ID, {
        agent,
    });

    return false;
};
//FIN DE FUNCIONES PARA CONEXION

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    TESTREACT_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>

      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Escribe algo: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Enviar</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
