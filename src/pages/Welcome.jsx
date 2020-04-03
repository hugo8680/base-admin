import React from 'react';
import styles from './Welcome.less';
import { Link } from 'umi';
import { Carousel, Card } from 'antd';
import banner from '@/assets/banner.jpg';

const cards = [
  {
    id: 0,
    name: '账户中心',
    url: '/account/account',
    color: '#1890ff',
    description: '这是一段描述',
  },
  {
    id: 1,
    name: '财务管理',
    url: '/admin/sub-page',
    color: '#FF7752',
    description: '这是一段描述',
  },
  {
    id: 2,
    name: '产品管理',
    url: '/admin/sub-page',
    color: '#eb2f96',
    description: '这是一段描述',
  },
  {
    id: 3,
    name: '新闻管理',
    url: '/admin/sub-page',
    color: '#eb2f96',
    description: '这是一段描述',
  },
  {
    id: 4,
    name: '小程序管理',
    url: '/admin/sub-page',
    color: '#52c41a',
    description: '这是一段描述',
  },
  {
    id: 5,
    name: 'APP管理',
    url: '/admin/sub-page',
    color: '#E6A23C',
    description: '这是一段描述',
  },
];

const carousels = [
  {
    id: 0,
    url: banner,
  },
  {
    id: 1,
    url: banner,
  },
  {
    id: 2,
    url: banner,
  },
  {
    id: 3,
    url: banner,
  },
];

export default () => (
  <div>
    <Carousel autoplay className={styles.carousel}>
      {carousels.map(item => {
        return (
          <div key={item.id}>
            <img className={styles.image} src={item.url} alt="..." />
          </div>
        );
      })}
    </Carousel>
    <div className={styles.cardCenter}>
      {cards.map(item => {
        return (
          <Link key={item.id} to={item.url}>
            <Card className={styles.card} style={{ color: item.color }}>
              <h2 style={{ color: item.color, fontSize: '18px', fontWeight: 'bold' }}>
                {item.name}
              </h2>
            </Card>
          </Link>
        );
      })}
    </div>
  </div>
);
