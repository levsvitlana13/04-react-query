import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import styles from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.querySelector('#modal-root') || document.body;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} type="button" onClick={onClose}>
          ×
        </button>
        <img
          className={styles.backdropImage}
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              : 'https://via.placeholder.com/500x281'
          }
          alt={movie.title}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{movie.title}</h2>

          <div className={styles.metaInfo}>
            <p className={styles.rating}>
              <strong>Рейтинг:</strong>{' '}
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'Н/Д'} ⭐
            </p>
            <p className={styles.releaseDate}>
              <strong>Дата релізу:</strong> {movie.release_date || 'Невідомо'}
            </p>
          </div>

          <p className={styles.overview}>{movie.overview}</p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
