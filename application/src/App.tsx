import './App.css'
import GenerateLayer from './ui/generate/GenerateLayer';
import { LDMClient } from './api/LDMClient';
import ImageLayer from './ui/images/ImageLayer';

function App() {

  const client = new LDMClient();

  return (
    <>
      <h1>Generative AI Models</h1>
      <p>An academic project demonstrating image generation with a Diffusion Transformer (DiT).</p>
      <ImageLayer client={client}/>
      <GenerateLayer client={client}/>
    </>
  )
}

export default App
