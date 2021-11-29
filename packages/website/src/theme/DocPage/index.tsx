/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Head from '@docusaurus/Head'
import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs-types'
import renderRoutes from '@docusaurus/renderRoutes'
import { matchPath } from '@docusaurus/router'
import { docVersionSearchTag, ThemeClassNames } from '@docusaurus/theme-common'
import { translate } from '@docusaurus/Translate'
import { MDXProvider } from '@mdx-js/react'
import BackToTopButton from '@theme/BackToTopButton'
import type { DocumentRoute } from '@theme/DocItem'
import type { Props } from '@theme/DocPage'
import DocSidebar from '@theme/DocSidebar'
import IconArrow from '@theme/IconArrow'
import Layout from '@theme/Layout'
import MDXComponents from '@theme/MDXComponents'
import NotFound from '@theme/NotFound'
import clsx from 'clsx'
import React, { ReactNode, useCallback, useState } from 'react'

import styles from './styles.module.css'

type DocPageContentProps = {
  readonly currentDocRoute: DocumentRoute
  readonly versionMetadata: PropVersionMetadata
  readonly children: ReactNode
}

function DocPageContent({ currentDocRoute, versionMetadata, children }: DocPageContentProps): JSX.Element {
  const { pluginId, version } = versionMetadata

  const sidebarName = currentDocRoute.sidebar
  const sidebar = sidebarName ? versionMetadata.docsSidebars[sidebarName] : undefined

  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false)
  const [hiddenSidebar, setHiddenSidebar] = useState(false)
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false)
    }

    setHiddenSidebarContainer((value) => !value)
  }, [hiddenSidebar])

  return (
    <Layout
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsDocPage}
      searchMetadatas={{
        version,
        tag: docVersionSearchTag(pluginId, version),
      }}
    >
      <div className={styles.docPage}>
        <BackToTopButton />

        {sidebar && (
          <aside
            className={clsx(styles.docSidebarContainer, {
              [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
            })}
            onTransitionEnd={(e) => {
              if (!e.currentTarget.classList.contains(styles.docSidebarContainer)) {
                return
              }

              if (hiddenSidebarContainer) {
                setHiddenSidebar(true)
              }
            }}
          >
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              path={currentDocRoute.path}
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
            />

            {hiddenSidebar && (
              <div
                className={styles.collapsedDocSidebar}
                title={translate({
                  id: 'theme.docs.sidebar.expandButtonTitle',
                  message: 'Expand sidebar',
                  description: 'The ARIA label and title attribute for expand button of doc sidebar',
                })}
                aria-label={translate({
                  id: 'theme.docs.sidebar.expandButtonAriaLabel',
                  message: 'Expand sidebar',
                  description: 'The ARIA label and title attribute for expand button of doc sidebar',
                })}
                tabIndex={0}
                role="button"
                onKeyDown={toggleSidebar}
                onClick={toggleSidebar}
              >
                <IconArrow className={styles.expandSidebarButtonIcon} />
              </div>
            )}
          </aside>
        )}
        <main
          className={clsx(styles.docMainContainer, {
            [styles.docMainContainerEnhanced]: hiddenSidebarContainer || !sidebar,
          })}
        >
          <div
            className={clsx('container padding-top--lg padding-bottom--lg', styles.docItemWrapper, {
              [styles.docItemWrapperEnhanced]: hiddenSidebarContainer,
            })}
          >
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>
        </main>
      </div>
    </Layout>
  )
}

function DocPage(props: Props): JSX.Element {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location,
  } = props
  const currentDocRoute = docRoutes.find((docRoute) => matchPath(location.pathname, docRoute))
  if (!currentDocRoute) {
    return <NotFound />
  }
  return (
    <>
      <Head>
        {/* TODO we should add a core addRoute({htmlClassName}) generic plugin option */}
        <html className={versionMetadata.className} />
      </Head>
      <DocPageContent currentDocRoute={currentDocRoute} versionMetadata={versionMetadata}>
        {renderRoutes(docRoutes, { versionMetadata })}
      </DocPageContent>
    </>
  )
}

export default DocPage
