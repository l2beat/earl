/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isInternalUrl from '@docusaurus/isInternalUrl'
import Link from '@docusaurus/Link'
import type { PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs-types'
import { Collapsible, isSamePath, ThemeClassNames, useCollapsible, usePrevious } from '@docusaurus/theme-common'
import type { DocSidebarItemsProps, Props } from '@theme/DocSidebarItem'
import IconExternalLink from '@theme/IconExternalLink'
import clsx from 'clsx'
import React, { memo, useEffect } from 'react'

import styles from './styles.module.css'

const isActiveSidebarItem = (item: Props['item'], activePath: string): boolean => {
  switch (item.type) {
    case 'category':
      return item.items.some((subItem) => isActiveSidebarItem(subItem, activePath))
    case 'link':
      return isSamePath(item.href, activePath)
  }
}

// Optimize sidebar at each "level"
// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
export const DocSidebarItems = memo(function DocSidebarItems({ items, ...props }: DocSidebarItemsProps): JSX.Element {
  return (
    <>
      {items.map((item, index) => (
        <DocSidebarItem
          key={index} // sidebar is static, the index does not change
          item={item}
          {...props}
        />
      ))}
    </>
  )
})

export default function DocSidebarItem({ item, ...props }: Props): JSX.Element | null {
  switch (item.type) {
    case 'category':
      if (item.items.length === 0) {
        return null
      }
      return <DocSidebarItemCategory item={item} {...props} />
    case 'link':
    default:
      return <DocSidebarItemLink item={item} {...props} />
  }
}

// If we navigate to a category and it becomes active, it should automatically expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  setCollapsed,
}: {
  isActive: boolean
  collapsed: boolean
  setCollapsed: (b: boolean) => void
}) {
  const wasActive = usePrevious(isActive)
  useEffect(() => {
    const justBecameActive = isActive && !wasActive
    if (justBecameActive && collapsed) {
      setCollapsed(false)
    }
  }, [isActive, wasActive, collapsed, setCollapsed])
}

function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  ...props
}: Props & { item: PropSidebarItemCategory }) {
  const { items, label, collapsible, className } = item

  const isActive = isActiveSidebarItem(item, activePath)

  const { collapsed, setCollapsed, toggleCollapsed } = useCollapsible({
    // active categories are always initialized as expanded
    // the default (item.collapsed) is only used for non-active categories
    initialState: () => {
      if (!collapsible) {
        return false
      }
      return isActive ? false : item.collapsed
    },
  })

  useAutoExpandActiveCategory({ isActive, collapsed, setCollapsed })

  return (
    <li
      className={clsx(
        styles.earl__sidebarCategory,
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        {
          'menu__list-item--collapsed': collapsed,
        },
        className,
      )}
    >
      <a
        className={clsx('menu__link', {
          'menu__link--sublist': collapsible,
          'menu__link--active': collapsible && isActive,
          [styles.menuLinkText]: !collapsible,
        })}
        onClick={
          collapsible
            ? (e) => {
                e.preventDefault()
                toggleCollapsed()
              }
            : undefined
        }
        href={collapsible ? '#' : undefined}
        {...props}
      >
        {label}
      </a>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  )
}

function DocSidebarItemLink({ item, onItemClick, activePath, level, ...props }: Props & { item: PropSidebarItemLink }) {
  const { href, label, className } = item
  const isActive = isActiveSidebarItem(item, activePath)
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}
    >
      <Link
        className={clsx('menu__link', styles.earl__menuLink, {
          'menu__link--active': isActive,
        })}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalUrl(href) && {
          onClick: onItemClick,
        })}
        {...props}
      >
        {isInternalUrl(href) ? (
          label
        ) : (
          <span>
            {label}
            <IconExternalLink />
          </span>
        )}
      </Link>
    </li>
  )
}
