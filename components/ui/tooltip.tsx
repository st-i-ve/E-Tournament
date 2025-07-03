import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';

interface TooltipProviderProps {
  children: React.ReactNode;
}

interface TooltipProps {
  children: React.ReactNode;
}

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => (
  <View>{children}</View>
);

export const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(child => 
    React.isValidElement(child) && child.type === TooltipTrigger
  );
  const content = childrenArray.find(child => 
    React.isValidElement(child) && child.type === TooltipContent
  );

  const showTooltip = (event: any) => {
    event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      setTriggerLayout({ x: pageX, y: pageY, width, height });
      setVisible(true);
    });
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <View>
      {React.cloneElement(trigger as React.ReactElement, {
        onPress: showTooltip,
        onLongPress: showTooltip,
      })}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={hideTooltip}
      >
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={hideTooltip}
        >
          <View 
            style={[
              styles.tooltipContainer,
              {
                top: triggerLayout.y + triggerLayout.height + 5,
                left: triggerLayout.x,
              }
            ]}
          >
            {content}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children }) => (
  <View>{children}</View>
);

export const TooltipContent: React.FC<TooltipContentProps> = ({ children, className }) => (
  <View style={[styles.tooltipContent, className && styles.customContent]}>
    {typeof children === 'string' ? (
      <Text style={styles.tooltipText}>{children}</Text>
    ) : (
      children
    )}
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tooltipContainer: {
    position: 'absolute',
    zIndex: 1000,
  },
  tooltipContent: {
    backgroundColor: '#1f2937',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#374151',
    maxWidth: 200,
  },
  customContent: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },
  tooltipText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});