import { Component, type ReactNode } from 'react';
import { Button, Result } from 'antd';

import i18n from '@shared/config/i18n';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title={i18n.t('errorBoundary.title')}
          subTitle={i18n.t('errorBoundary.subTitle')}
          extra={
            <Button type="primary" onClick={this.handleReload}>
              {i18n.t('errorBoundary.reload')}
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
