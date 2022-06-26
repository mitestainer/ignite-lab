import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(props.availableAt)
  const formated = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBR }
  )

  const isActiveLesson = slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{formated}</span>
      <div
        className={cn(
          'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',
          {
            'bg-green-500': isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={cn('text-sm  font-medium flex items-center gap-2', {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson,
              })}
            >
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={cn(
              'text-xs rounded px-2 py[0.125rem] text-white border font-bold',
              {
                'border-white': isActiveLesson,
                'border-green-300': !isActiveLesson,
              }
            )}
          >
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <span
          className={cn('mt-5 block font-bold', {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson,
          })}
        >
          {props.title}
        </span>
      </div>
    </Link>
  )
}
