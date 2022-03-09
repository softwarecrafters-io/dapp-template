import React, { useState } from "react";

import './index.scss'
import { allColors } from "./colors";

type CssVariables =
  |'--headChestColor'
  | '--mouthBodyTailColor'
  | '--eyeColor'
  | '--earPawColor'
  | '--eyeBorderBottom'
  | '--eyeBorderTop'
  | '--eyeHeight'
  | '--decorationTransform'
  | '--decorationMiddleColor'
  | '--decorationSideColor'
  | '--animationHead'
  | '--animationLeftEar'
  | '--animationRightEar'
  | '--animationTail'

type DNA = [number, number, number, number, number, number, number, number, number];

export class CssEditor {
  setVar(name: CssVariables, value: string) {
    document.documentElement.style.setProperty(name, value);
  }
  getVar(name: CssVariables) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }
}

export const KryptoKittiesApp = () =>{
  const initialDna : DNA = [10, 11, 12, 10, 1, 1,14,14, 1];
  const {queries, commands} = KryptoKittiesHook(initialDna);
  return <div className='container'>
    <h1>Krypto CSS Kitties - Factory</h1>
    <h3>Create your custom Kitty</h3>
    <div className='cat-editor'>
      <div className='cat-box'>
        <Cat/>
        <div className={'dna'}>
          <span>{queries().dnaFormatted}</span>
        </div>
      </div>
      <div className='cat-colors'>
        <div className="form-group">
          <div className='header-group'><b>Head | Body</b><span>Code: {queries().headChestColor}</span></div>
          <input type="range" min="10" max="98" value={queries().headChestColor} onChange={e => commands.setHeadChestColor(Number.parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
          <div className='header-group'><b>Mouth | Belly | Tail</b><span>Code: {queries().mouthBodyTailColor}</span></div>
          <input type="range" min="10" max="98" value={queries().mouthBodyTailColor} onChange={e => commands.setMouthBodyTailColor(Number.parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
          <div className='header-group'><b>Eyes color</b><span>Code: {queries().eyeColor}</span></div>
          <input type="range" min="10" max="98" value={queries().eyeColor} onChange={e => commands.setEyeColor(Number.parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
          <div className='header-group'><b>Ears | Paw</b><span>Code: {queries().earPawColor}</span></div>
          <input type="range" min="10" max="98" value={queries().earPawColor} onChange={e => commands.setEarPawColor(Number.parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
          <div className='header-group'><b>Eye Shape</b><span>Code: {queries().eyeShape}</span></div>
          <input type="range" min="1" max="4" value={queries().eyeShape} onChange={e => commands.setEyeShape(Number.parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
          <div className='header-group'><b>Decoration pattern</b><span>Code: {queries().decorationPattern}</span></div>
          <input type="range" min="1" max="5" value={queries().decorationPattern} onChange={e => commands.setDecorationPattern(Number.parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
          <div className='header-group'><b>Decoration Middle color</b><span>Code: {queries().decorationColorMiddle}</span></div>
          <input type="range" min="10" max="98" value={queries().decorationColorMiddle} onChange={e => commands.setDecorationColorMiddle(Number.parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
        <div className='header-group'><b>Decoration Sides color</b><span>Code: {queries().decorationColorSides}</span></div>
        <input type="range" min="10" max="98" value={queries().decorationColorSides} onChange={e => commands.setDecorationColorSides(Number.parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
          <div className='header-group'><b>Animation</b><span>Code: {queries().animation}</span></div>
          <input type="range" min="1" max="5" value={queries().animation} onChange={e => commands.setAnimation(Number.parseInt(e.target.value))}/>
        </div>
        <div style={{display:'flex'}}>
          <button onClick={commands.generateDefaultDna}>Default</button>
          <button onClick={commands.generateRandomDna}>Random</button>
        </div>
      </div>

    </div>

  </div>
}

export const Cat = () => {
  return <div className="cat">
    <div className="cat__ear">
      <div id="leftEar" className="cat__ear--left">
        <div className="cat__ear--left-inside"/>
      </div>
      <div id="rightEar" className="cat__ear--right">
        <div className="cat__ear--right-inside"/>
      </div>
    </div>
    <div id="head" className="cat__head">
      <div id="midDot" className="cat__head-dots">
        <div id="leftDot" className="cat__head-dots_first"/>
        <div id="rightDot" className="cat__head-dots_second"/>
      </div>
      <div className="cat__eye">
        <div className="cat__eye--left">
          <span className="pupil-left"/>
        </div>
        <div className="cat__eye--right">
          <span className="pupil-right"/>
        </div>
      </div>
      <div className="cat__nose"/>
      <div className="cat__mouth-contour"/>
      <div className="cat__mouth-left"/>
      <div className="cat__mouth-right"/>
      <div className="cat__whiskers-left"/>
      <div className="cat__whiskers-right"/>
    </div>
    <div className="cat__body">
      <div className="cat__chest"/>
      <div className="cat__chest_inner"/>
      <div className="cat__paw-left"/>
      <div className="cat__paw-left_inner"/>
      <div className="cat__paw-right"/>
      <div className="cat__paw-right_inner"/>
      <div id="tail" className="cat__tail"></div>
    </div>
  </div>
}

const KryptoKittiesHook = (dna: DNA) => {
  const [headChestColor, setHeadChestColor] = useState(dna[0]);
  const [mouthBodyTailColor, setMouthBodyTailColor] = useState(dna[1]);
  const [eyeColor, setEyeColor] = useState(dna[2]);
  const [earPawColor, setEarPawColor] = useState(dna[3]);
  const [eyeShape, setEyeShape] = useState(dna[4]);
  const [decorationPattern, setDecorationPattern] = useState(dna[5]);
  const [decorationColorMiddle, setDecorationColorMiddle] = useState(dna[6]);
  const [decorationColorSides, setDecorationColorSides] = useState(dna[7]);
  const [animation, setAnimation] = useState(dna[8]);

  const randomBetween = (from:number, to:number) => {
    return Math.floor(Math.random() * (to - from)) + from;
  }

  const setDNA = (initialDna:DNA) => {
    setHeadChestColor(initialDna[0]);
    setMouthBodyTailColor(initialDna[1]);
    setEyeColor(initialDna[2]);
    setEarPawColor(initialDna[3]);
    setEyeShape(initialDna[4]);
    setDecorationPattern(initialDna[5]);
    setDecorationColorMiddle(initialDna[6]);
    setDecorationColorSides(initialDna[7]);
    setAnimation(initialDna[8]);
  }
  const generateDefaultDna = () => {
    const initialDna : DNA = [10, 11, 12, 10, 1, 1,14,14, 1];
    setDNA(initialDna);
  }


  const generateRandomDna = () => {
      const initialDna : DNA = [
        randomBetween(10, 100),
        randomBetween(10, 100),
        randomBetween(10, 100),
        randomBetween(10, 100),
        randomBetween(1, 6),
        randomBetween(1, 6),
        randomBetween(10, 100),
        randomBetween(10, 100),
        randomBetween(1, 6)
      ];
      setDNA(initialDna);
    }

  const dnaFormatted =
    `DNA: ${headChestColor} ${mouthBodyTailColor} ${eyeColor} ${earPawColor} ${eyeShape} ${decorationPattern} ${decorationColorMiddle} ${decorationColorSides} ${animation}`

  const queries = () => ({
    headChestColor, mouthBodyTailColor, eyeColor, earPawColor, eyeShape, decorationPattern, decorationColorMiddle, decorationColorSides, animation, dnaFormatted
  })

  const commands = {
    setHeadChestColor, setMouthBodyTailColor, setEyeColor, setEarPawColor, setEyeShape, setDecorationPattern, setDecorationColorMiddle, setDecorationColorSides, setAnimation, generateDefaultDna, generateRandomDna
  }

  const setColors = () => {
    const cssEditor = new CssEditor();
    cssEditor.setVar('--headChestColor', '#' + allColors()[headChestColor as 50])
    cssEditor.setVar('--mouthBodyTailColor', '#' + allColors()[mouthBodyTailColor as 50])
    cssEditor.setVar('--eyeColor', '#' + allColors()[eyeColor as 50])
    cssEditor.setVar('--earPawColor', '#' + allColors()[earPawColor as 50])
    cssEditor.setVar('--decorationMiddleColor', '#' + allColors()[decorationColorMiddle as 50])
    cssEditor.setVar('--decorationSideColor', '#' + allColors()[decorationColorSides as 50])
  }

  const setEyesShape = () => {
    const cssEditor = new CssEditor();
    if(eyeShape == 1){
      cssEditor.setVar('--eyeHeight', '42px');
      cssEditor.setVar('--eyeBorderBottom','0px')
      cssEditor.setVar('--eyeBorderTop',  '0px')
    }
    if(eyeShape == 2){
      cssEditor.setVar('--eyeHeight', '27px');
      cssEditor.setVar('--eyeBorderBottom','15px')
      cssEditor.setVar('--eyeBorderTop',  '0px')
    }
    if(eyeShape == 3){
      cssEditor.setVar('--eyeHeight', '27px');
      cssEditor.setVar('--eyeBorderBottom','0px')
      cssEditor.setVar('--eyeBorderTop',  '15px')
    }
    if(eyeShape == 4){
      cssEditor.setVar('--eyeHeight', '12px');
      cssEditor.setVar('--eyeBorderBottom','15px')
      cssEditor.setVar('--eyeBorderTop',  '15px')
    }
  }

  const setDecoration = ()=> {
    const cssEditor = new CssEditor();
    if(decorationPattern == 1){
      cssEditor.setVar('--decorationTransform',  'rotate(0deg)');
    }
    if(decorationPattern == 2){
      cssEditor.setVar('--decorationTransform',  'rotate(180deg)');
    }
    if(decorationPattern == 3){
      cssEditor.setVar('--decorationTransform',  'rotate(180deg) translate(0, 40px)');
    }
    if(decorationPattern == 4){
      cssEditor.setVar('--decorationTransform',  'scale(1.5, 0.5)');
    }
    if(decorationPattern == 5){
      cssEditor.setVar('--decorationTransform',  'rotate(180deg) scale(1.5, 0.5)');
    }
  }

  const setAnimationVar = () => {
    const cssEditor = new CssEditor();
    if(animation == 1){
      resetAnimation();
    }
    if(animation == 2){
      resetAnimation();
      cssEditor.setVar('--animationHead',  'moveHead 2s infinite');
    }
    if(animation == 3){
      resetAnimation();
      cssEditor.setVar('--animationTail',  'moveTail 2.5s infinite');
    }
    if(animation == 4){
      resetAnimation();
      cssEditor.setVar('--animationRightEar',  'earRight 3s infinite');
      cssEditor.setVar('--animationLeftEar',  'earLeft 3s infinite');
    }
    if(animation == 5){
      resetAnimation();
      cssEditor.setVar('--animationRightEar',  'earUpRight 3s infinite');
      cssEditor.setVar('--animationLeftEar',  'earUpLeft 3s infinite');
    }
  }

  const resetAnimation = () =>{
    const cssEditor = new CssEditor();
    cssEditor.setVar('--animationHead',  'none');
    cssEditor.setVar('--animationLeftEar',  'none');
    cssEditor.setVar('--animationRightEar',  'none');
    cssEditor.setVar('--animationTail',  'none');
  }

  setColors();
  setEyesShape();
  setDecoration();
  setAnimationVar();

  return {
    queries, commands
  }
}