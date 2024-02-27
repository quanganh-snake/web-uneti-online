import { useState } from 'react'
import { homeMotCua } from '@/Services/Static/dataStatic.js'
import { Link } from 'react-router-dom'
import { useNamespace } from '@/Services/Hooks/useNamespace.js'

import './NavbarMotCua.scss'

function NavbarMotCua() {
  const bem = useNamespace('navbar-user')

  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className={bem.b()} id="navbar-user">
      <ul className={bem.e('list')}>
        {homeMotCua?.map((module, index) => {
          const handleActive = () => {
            if (activeIndex === index) {
              setActiveIndex(null)
            } else {
              setActiveIndex(index)
            }
          }
          const isActive = index === activeIndex
          return (
            <li key={index}>
              <Link
                to={'/mot-cua' + module.path}
                className={[bem.e('item'), bem.is('active', isActive)].join(
                  ' ',
                )}
                aria-current="page"
                onClick={handleActive}
              >
                {module.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavbarMotCua
