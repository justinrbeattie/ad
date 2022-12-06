import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import styles from './content.css?inline';

export default component$((props: { attributes: any, columns: Columns, rows: Rows }) => {
  useStyles$(styles);
  const columnStyle =  {'--xs-column': props.columns.xs, '--sm-column': props.columns.sm, '--md-column': props.columns.md, '--lg-column': props.columns.lg, '--xl-column': props.columns.xl, '--xxl-column': props.columns.xxl};
  const rowStyle =  {'--xs-row': props.rows.xs, '--sm-row': props.rows.sm, '--md-row': props.rows.md, '--lg-row': props.rows.lg, '--xl-row': props.rows.xl, '--xxl-row': props.rows.xxl};

  return (
    <div
      className='content'  {...props.attributes}
      style={{...columnStyle, ...rowStyle}}  >
      <Slot></Slot>
    </div>
  );
});




export interface Columns {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}


export interface Rows {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}
