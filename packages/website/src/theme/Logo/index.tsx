import Link from '@docusaurus/Link'
import { useThemeConfig } from '@docusaurus/theme-common'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import type { Props } from '@theme/Logo'
import ThemedImage from '@theme/ThemedImage'
import React from 'react'

const Logo = (props: Props): JSX.Element => {
  const {
    siteConfig: { title },
  } = useDocusaurusContext()
  const {
    navbar: { title: navbarTitle, logo = { src: '' } },
  } = useThemeConfig()

  const { imageClassName, titleClassName, ...propsRest } = props
  const logoLink = useBaseUrl(logo.href || '/')
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  }
  const themedImage = (
    <ThemedImage sources={sources} height={logo.height} width={logo.width} alt={logo.alt || navbarTitle || title} />
  )

  return (
    <Link to={logoLink} {...propsRest} {...(logo.target && { target: logo.target })}>
      {logo.src && (
        <div className={imageClassName} style={{ display: 'flex' }}>
          {themedImage}
        </div>
      )}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  )
}

export default Logo
