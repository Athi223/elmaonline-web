import React, { useEffect } from 'react';
import LocalTime from 'components/LocalTime';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { ListRow, ListCell, ListContainer } from 'components/List';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
import Link from 'components/Link';

const Notifications = () => {
  const { notifications, seenAt } = useStoreState(state => state.Notifications);
  const { getNotifications, markSeen } = useStoreActions(
    actions => actions.Notifications,
  );
  const { getNotificationsCount } = useStoreActions(actions => actions.Login);

  useEffect(() => {
    getNotifications();
    getNotificationsCount();
  }, [seenAt]);

  useEffect(() => {
    const timer = setTimeout(() => {
      markSeen();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = type => {
    switch (type) {
      case 'comment':
        return <CommentIcon />;
      case 'beaten':
        return <TrendingDownIcon />;
      default:
        break;
    }
  };

  const getText = n => {
    const meta = JSON.parse(n.Meta);

    switch (n.Type) {
      case 'comment':
        return (
          <div>
            {meta.kuski} added comment to your replay{' '}
            <Link to={`/r/${meta.replayUUID}`}>{meta.replayName}</Link>:{' '}
            <i>"{meta.Text}"</i>
          </div>
        );
      case 'beaten':
        return (
          <div>
            {meta.kuski} crushed your world record in level{' '}
            <Link to={`/levels/${meta.levelIndex}`}>{meta.level}</Link>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <ListContainer>
      {notifications.map(n => {
        return (
          <ListRow key={n.NotificationIndex} verticalAlign="middle">
            <ListCell width={60} verticalAlign="middle" textAlign="center">
              <Badge color="secondary" badgeContent={!n.SeenAt ? 'new' : null}>
                <Avatar>{getIcon(n.Type)}</Avatar>
              </Badge>
            </ListCell>
            <ListCell>
              <Written>
                <LocalTime
                  date={n.CreatedAt}
                  format="ddd D MMM YYYY HH:mm"
                  parse="X"
                />
              </Written>
              {getText(n)}
            </ListCell>
          </ListRow>
        );
      })}
    </ListContainer>
  );
};

const Written = styled.span`
  color: ${p => p.theme.lightTextColor};
`;

export default Notifications;
