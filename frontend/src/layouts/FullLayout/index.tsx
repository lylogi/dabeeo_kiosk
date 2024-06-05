import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface FullLayoutProps {
  children?: ReactNode;
}

const FullLayout: FC<FullLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="container-full">
          { children }
          {/* <Row>
              <Footer />
          </Row> */}
      </div>
    </>
  );
};

FullLayout.propTypes = {
  children: PropTypes.node
};

export default FullLayout;
