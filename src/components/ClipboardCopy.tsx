import { useState } from 'react';

interface ClipboardCopyProps {
  copyText: string;
}

function ClipboardCopy({ copyText }: Readonly<ClipboardCopyProps>) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text:string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="text" value={copyText} readOnly />
      {/* Bind our handler function to the onClick button property */}
      <button onClick={handleCopyClick}>
        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </button>
    </div>
  );
}

export default ClipboardCopy;
