import { sendGTMEvent } from '@next/third-parties/google';

type TrackProductParams = {
  id: string;
  name: string;
};

export const sendGTMProductClick = ({ id, name }: TrackProductParams) => {
  sendGTMEvent({
    event: 'select_item',
    product_name: name,
    ecommerce: {
      item_list_name: 'Product Catalog',
      items: [
        {
          item_id: id,
          item_name: name
        },
      ],
    },
  });
};