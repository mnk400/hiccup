import { FC, useCallback, useState, MouseEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Modal } from 'components/common/Modal'
import { Icon } from 'components/common/Icon'
import styles from './index.module.css'
import { classNames } from 'modules/utils'

interface NotesModalProps {
  notes: string
  title: string
  editing?: boolean
  position?: 'top-right' | 'bottom-right'
}

export const NotesModal: FC<NotesModalProps> = ({ 
  notes, 
  title, 
  editing = false,
  position = 'top-right'
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback((e: MouseEvent) => {
    // Stop the event from propagating to parent elements (like the card link)
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle container click to prevent propagation
  const handleContainerClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <>
      <div 
        className={classNames([
          styles.infoIconContainer,
          [editing, styles.editing],
          [position === 'bottom-right', styles.bottomRight],
          [position === 'top-right', styles.topRight]
        ])} 
        title="View notes"
        onClick={handleContainerClick}
      >
        <Icon
          icon="info"
          size={15}
          as="button"
          className={styles.infoIcon}
          onClick={handleOpen}
        />
      </div>
      <Modal show={isOpen} onClose={handleClose}>
        <h1 className={styles.notesTitle}>{title}</h1>
        <div className={styles.notesContent}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{notes}</ReactMarkdown>
        </div>
      </Modal>
    </>
  )
}

export default NotesModal
