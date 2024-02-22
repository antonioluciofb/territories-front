import { Card } from '@Types/Cards';
import { cardStatusColors } from 'Constants/cards';

export const getCardStatusColor = (card: Card) => {
  if (card.inProgress) {
    return cardStatusColors.inProgress;
  }

  if (card.finished) {
    return cardStatusColors.finished;
  }

  return cardStatusColors.pending;
};

const reduceRanges = (arr: number[]) => {
  let result = '';
  let start = arr[0];
  let end = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === end + 1) {
      end = arr[i];
    } else {
      if (start === end) {
        result += start + ',';
      } else if (start === end - 1) {
        result += start + ',' + end + ',';
      } else {
        result += start + '-' + end + ',';
      }
      start = arr[i];
      end = arr[i];
    }
  }

  if (start === end) {
    result += start;
  } else if (start === end - 1) {
    result += start + ',' + end;
  } else {
    result += start + '-' + end;
  }

  return result;
};

export const squashBlocks = (pendingBlocks: Card['pendingBlocks']) => {
  const pendingBlocksLength = pendingBlocks.length;

  if (pendingBlocksLength === 0) {
    return '';
  }

  if (pendingBlocksLength === 1) {
    return pendingBlocks[0].toString();
  }

  return reduceRanges(pendingBlocks);
};
