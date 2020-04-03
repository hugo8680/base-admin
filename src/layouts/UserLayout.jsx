import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, connect } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Mos Design</span>
              </Link>
            </div>
            <div className={styles.desc}>Mos Design 净月区最没影响力的设计规范</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="2020 东北学渣技术体验部出品"
          links={[
            {
              key: 'mos design',
              title: 'Mos Design',
              href: 'http://www.baidu.com',
              blankTarget: true,
            },
            { key: 'mos ui', title: 'Mos UI', href: 'http://www.baidu.com', blankTarget: true },
            {
              key: 'mos spring',
              title: 'Spring Mos',
              href: 'http://www.baidu.com',
              blankTarget: true,
            },
            {
              key: '东北学渣',
              title: '东北学渣NEXZ',
              href: 'http://www.baidu.com',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
