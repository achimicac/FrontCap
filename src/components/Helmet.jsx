
import { Helmet } from 'react-helmet';

const maidappHelmet = ({ title, description }) => (
        <Helmet>
         <title>{title}</title>
          <meta name="description" content={description} />
       </Helmet>
);

export default maidappHelmet;