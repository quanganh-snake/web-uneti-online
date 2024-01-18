import { useBem } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import PropTypes from 'prop-types'
import { useState } from 'react'

export const SidebarItem = ({ item, onClick, modelValue }) => {
  const bem = useBem('sidebar')

  const [isOpen, setIsOpen] = useState(false)

  const handleSidebarItemClick = (e) => {
    e.stopPropagation()

    if (item.children?.length) {
      setIsOpen((prev) => !prev)
    } else onClick(item)
  }

  return (
    <>
      <div
        onClick={handleSidebarItemClick}
        className={transformCls([
          bem.e('item'),
          bem.is('active', modelValue == item.name),
          bem.is('open', isOpen),
          bem.is('group', item.children?.length),
        ])}
      >
        <div className={bem.em('item', 'label')}>
          {item.label}
          {item.children?.length ? (
            isOpen ? (
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
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9 7.93994L15.52 10.5599C16.29 11.3299 16.29 12.5899 15.52 13.3599L9 19.8699"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 4.04004L10.04 5.08004"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )
          ) : null}
        </div>
        {item.children?.length ? (
          <div className={bem.e('group')}>
            {item.children.map((e, index) => (
              <SidebarItem
                key={index}
                item={e}
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
