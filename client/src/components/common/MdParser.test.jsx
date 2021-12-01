import React from 'react';
import { screen, render  } from '@testing-library/react';

function ReactMarkdown({ children }){
  const [ , ,originalTag, content] = children.match(/((-|#|##|\*|\*\*|~) ?)?([a-zA-Z]+)/);
  let tag = '';
  switch (originalTag){
    case "#":
      tag = 'h1';
      break;
    case "##":
      tag = 'h2';
      break;
    case "-":
      tag = 'li';
      break;
    case "*":
      tag = 'em';
      break;
    case "**":
      tag = 'strong';
      break;
    case "~":
      tag = 'del';
      break;
    default:
      tag = 'p';
      break;
  }

  if(!tag) return children;
  const result = React.createElement(tag, null, content)
  return result;
}

describe('React Markdown mock 테스트 ', () =>{
  
  it('h1 테스트', ()=>{
    const tmp = "# hihi";
    render(<ReactMarkdown>{tmp}</ReactMarkdown>)
    expect(screen.getByText('hihi')).toContainHTML('<h1>hihi</h1>')  
  })

  it('h2 테스트', ()=>{
    const tmp = "## hihi";
    render(<ReactMarkdown>{tmp}</ReactMarkdown>)
    expect(screen.getByText('hihi')).toContainHTML('<h2>hihi</h2>')  
  });

  it('li 테스트', ()=>{
    const tmp = "- hihi";
    render(<ReactMarkdown>{tmp}</ReactMarkdown>)
    expect(screen.getByText('hihi')).toContainHTML('<li>hihi</li>')  
  });

  it('strong 테스트', ()=>{
    const tmp = "**hihi**";
    render(<ReactMarkdown>{tmp}</ReactMarkdown>)
    expect(screen.getByText('hihi')).toContainHTML('<strong>hihi</strong>')  
  });

  it('italic 테스트', ()=>{
    const tmp = "*hihi*";
    render(<ReactMarkdown>{tmp}</ReactMarkdown>)
    expect(screen.getByText('hihi')).toContainHTML('<em>hihi</em>')  
  });

  it('del 테스트', ()=>{
    const tmp = "~hihi~";
    render(<ReactMarkdown>{tmp}</ReactMarkdown>)
    expect(screen.getByText('hihi')).toContainHTML('<del>hihi</del>')  
  });

  it('p 테스트', ()=>{
    const tmp = "hihi";
    render(<ReactMarkdown>{tmp}</ReactMarkdown>)
    expect(screen.getByText('hihi')).toContainHTML('<p>hihi</p>')  
  }); 
   
})