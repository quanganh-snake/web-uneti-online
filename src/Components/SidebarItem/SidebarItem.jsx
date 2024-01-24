import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import PropTypes from 'prop-types'
import { useState } from 'react'

export const SidebarItem = ({ item, onClick, modelValue }) => {
  const bem = useNamespace('sidebar')

  const [isOpen, setIsOpen] = useState(false)

  const handleSidebarItemClick = (e) => {
    e.stopPropagation()

    onClick(item)
    if (item.children?.length) {
      setIsOpen((prev) => !prev)
    }
  }

  return (
    <>
      <div
        onClick={handleSidebarItemClick}
        className={transformCls([
          bem.e('item'),
          bem.is('active', modelValue == item.name && !item.children?.length),
          bem.is('open', isOpen),
          bem.is('group', item.children?.length),
        ])}
      >
        <div className={bem.em('item', 'label')}>
          {item.label}
          {item.children?.length ? (
            <div
              className={`${isOpen ? 'rotate-0' : '-rotate-90'} duration-200`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0101 12.85L13.3901 15.47C12.6201 16.24 11.3601 16.24 10.5901 15.47L4.08008 8.94995"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.9199 8.94995L18.8799 9.98995"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : null}
        </div>
        {item.children?.length ? (
          <div className={bem.e('group')}>
            {item.children.map((e, index) => (
              <SidebarItem
                key={index}
                item={{
                  ...e,
                  name: `${item.name}${e.name}`,
                }}
                onClick={onClick}
                modelValue={modelValue}
              />
            ))}
          </div>
        ) : null}{' '}
      </div>
    </>
  )
}

SidebarItem.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  group: PropTypes.array,
}
