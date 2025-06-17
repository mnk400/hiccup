// Using FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faCog, 
  faEllipsis, 
  faFileAlt, 
  faFileDownload, 
  faFolderPlus, 
  faGlasses, 
  faGlobeAmericas, 
  faImage, 
  faInfoCircle, 
  faPen, 
  faPlusCircle, 
  faPlus, 
  faSave, 
  faSearch, 
  faTable, 
  faTimes, 
  faTrash, 
  faExclamationTriangle, 
  faUndo, 
  faUpload,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import { 
  faSquarePlus, 
  faStar 
} from '@fortawesome/free-regular-svg-icons';
import { FC, SVGProps } from 'react';

// Create a wrapper component to maintain the same interface as the SVG components
const createIconComponent = (icon: any): FC<SVGProps<SVGSVGElement>> => {
  return (props: any) => {
    // Extract SVG-specific props that might cause issues with FontAwesome
    const { 
      mask, viewBox, xmlSpace, xmlnsXlink, xmlns, 
      pointerEvents, strokeWidth, strokeLinecap, strokeLinejoin, 
      strokeMiterlimit, strokeDasharray, strokeDashoffset, strokeOpacity,
      ...validProps 
    } = props;
    
    return <FontAwesomeIcon icon={icon} {...validProps} />;
  };
};

const icons = {
  check: createIconComponent(faCheck),
  cog: createIconComponent(faCog),
  ellipsis: createIconComponent(faEllipsis),
  file: createIconComponent(faFileAlt),
  download: createIconComponent(faFileDownload),
  'folder-plus': createIconComponent(faFolderPlus),
  glasses: createIconComponent(faGlasses),
  earth: createIconComponent(faGlobeAmericas),
  image: createIconComponent(faImage),
  info: createIconComponent(faInfoCircle),
  save: createIconComponent(faSave),
  table: createIconComponent(faTable),
  times: createIconComponent(faTimes),
  trash: createIconComponent(faTrash),
  'triangle-exclamation': createIconComponent(faExclamationTriangle),
  undo: createIconComponent(faUndo),
  edit: createIconComponent(faPen),
  add: createIconComponent(faPlusCircle),
  plus: createIconComponent(faPlus),
  star: createIconComponent(faStar),
  search: createIconComponent(faSearch),
  'square-plus': createIconComponent(faSquarePlus),
  sync: createIconComponent(faSync),
  upload: createIconComponent(faUpload),
};

export { icons, icons as default }
