import java.util.*;

public class basic {
    static int count = 0;
    static boolean move_big_to_last(int [] arr, int len) {
        final boolean swap = false;
        for (int i = 0; i < len; i++) {
            if(arr[i] > arr[i+1]) {
                int temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                //swap = true;
            }
        }
        return swap;
    }

    static void bubble_sort(int [] arr_to_sort) {
        int l = arr_to_sort.length;
        int lc = 0;
        boolean s;
        l--;

        while(l > 0) {
            s = move_big_to_last(arr_to_sort, l);
            lc++;
            if (!s) {
                break;
            }

            l--;
        }
        System.out.println("lc:" + lc);
    }

    public static void main(String[] args) {
        int [] arr = {1,2,3,4,5};
        //List <Integer> alist = new ArrayList<>(Arrays.asList(arr));
        //bubble_sort(arr);

        basic bobj = new basic();
        System.out.println("Count:" + bobj.count);

        basic bobj1 = new basic();
        bobj1.count++;
        System.out.println("Count:" + basic.count);
        System.out.println("Count:" + bobj.count);

        //System.out.println("arr:" + Arrays.toString(arr));
    }

}
