import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface TableProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableRowProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isHighlighted?: boolean;
}

interface TableCellProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  align?: 'left' | 'center' | 'right';
}

interface TableHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableBodyProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableHeadProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  align?: 'left' | 'center' | 'right';
}

export const Table: React.FC<TableProps> = ({ children, style }) => (
  <View style={[styles.table, style]}>
    {children}
  </View>
);

export const TableHeader: React.FC<TableHeaderProps> = ({ children, style }) => (
  <View style={[styles.tableHeader, style]}>
    {children}
  </View>
);

export const TableBody: React.FC<TableBodyProps> = ({ children, style }) => (
  <View style={[styles.tableBody, style]}>
    {children}
  </View>
);

export const TableRow: React.FC<TableRowProps> = ({ children, style, isHighlighted }) => (
  <View style={[
    styles.tableRow, 
    isHighlighted && styles.highlightedRow,
    style
  ]}>
    {children}
  </View>
);

export const TableHead: React.FC<TableHeadProps> = ({ children, style, textStyle, align = 'left' }) => (
  <View style={[styles.tableHead, style]}>
    <Text style={[
      styles.tableHeadText, 
      align === 'center' && styles.textCenter,
      align === 'right' && styles.textRight,
      textStyle
    ]}>
      {children}
    </Text>
  </View>
);

export const TableCell: React.FC<TableCellProps> = ({ children, style, textStyle, align = 'left' }) => (
  <View style={[styles.tableCell, style]}>
    <Text style={[
      styles.tableCellText,
      align === 'center' && styles.textCenter,
      align === 'right' && styles.textRight,
      textStyle
    ]}>
      {children}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  tableBody: {
    // No specific styles needed
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    minHeight: 40,
    alignItems: 'center',
  },
  highlightedRow: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: '#22c55e',
  },
  tableHead: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  tableHeadText: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  tableCell: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  tableCellText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
});