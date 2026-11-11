/**
 * Runs before first paint so a saved light/dark choice never flashes.
 * "system" (or nothing saved) leaves data-theme unset and CSS follows
 * prefers-color-scheme.
 */
const code = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
