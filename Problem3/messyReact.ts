import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
//FormattedWalletBalance can extend currency and amount from WalletBalance by extend key word

interface Props extends BoxProps {

}
//cannot find BoxProps, if you don't have BoxProps, you should defind type of Props
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  //childrent is not use
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    //should define type for blockchain
    //blockchain should be rename to camelCase(blockChain)
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      //'Zilliqa' and 'Neo' is return same value.
      //Should be merge in 1 case
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      //balance have type WalletBalance, it not includes blockchain property
      //WalletBalance should be add blockchain property
      if (lhsPriority > -99) {
        //lhsPriority is not declare, may be use balancePriority here
        if (balance.amount <= 0) {
          //I think this logic is not correct, it should be > 0
          return true;
        }
      }
      return false
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      //lhs and rsh have type WalletBalance, it not includes blockchain property
      //WalletBalance should be add blockchain property
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    //sortedBalances is WalletBalance type, not includes formatted
    //you should to use FormattedWalletBalance instead of WalletBalance
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    //should be use formattedBalances innstead of sortedBalances
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className= { classes.row }
    key = { index }
    //should be use unique key instead of index. In this case
    //you can use currency balance.currency
    amount = { balance.amount }
    usdValue = { usdValue }
    formattedAmount = { balance.formatted }
      />
            )
})

return (
  <div { ...rest } >
  { rows }
  </div>
)
}